// src/Components/KeypairManager/TonKeypairManager.jsx
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import Button from "../Button/Button";

const TonKeypairManager = ({ onInitialize }) => {
  const [password, setPassword] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [currentMnemonic, setCurrentMnemonic] = useState("");
  const [error, setError] = useState("");
  const [isDecrypted, setIsDecrypted] = useState(false);

  useEffect(() => {
    const loadKeypair = async () => {
      const storedData = localStorage.getItem("keypair");
      if (storedData && password) {
        try {
          const { encryptedData, salt, iv } = JSON.parse(storedData);
          const decrypted = await decryptData(
            encryptedData,
            salt,
            iv,
            password
          );
          setCurrentMnemonic(decrypted.mnemonic);
          setCurrentAddress(decrypted.publicAddress);
          setIsDecrypted(true);
          setError("");
        } catch (err) {
          setError("Invalid password");
          setIsDecrypted(false);
        }
      }
    };

    loadKeypair();
  }, [password]);

  const handleGenerateKeypair = async () => {
    if (!password) {
      setError("Please enter a password first");
      return;
    }

    try {
      const mnemonic = generateMnemonic();
      const publicAddress = await generatePublicAddress(mnemonic);

      const encrypted = await encryptData(
        { mnemonic, publicAddress },
        password
      );
      localStorage.setItem("keypair", JSON.stringify(encrypted));

      setCurrentMnemonic(mnemonic);
      setCurrentAddress(publicAddress);
      setIsDecrypted(true);
      setError("");
      onInitialize();
    } catch (err) {
      setError("Failed to generate keypair");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>TON Keypair Manager</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              placeholder="Enter encryption password"
            />
          </div>

          <div className="flex space-x-2">
            <Button
              title="Generate New Keypair"
              type="add"
              onClick={handleGenerateKeypair}
            />
            <Button
              title="Delete Current Keypair"
              type="remove"
              onClick={handleDeleteKeypair}
            />
          </div>

          {isDecrypted && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p className="text-sm font-medium text-gray-700">
                Public Address:
              </p>
              <p className="text-xs break-all">{currentAddress}</p>
              <p className="text-sm font-medium text-gray-700 mt-2">
                Mnemonic:
              </p>
              <p className="text-xs break-all">{currentMnemonic}</p>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TonKeypairManager;
