import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Header = () => {
  return (
    <div>
      <Card className="flex justify-between h-12 p-3">
        <div>Logo</div>
        <div>test@gmail.com</div>
      </Card>
    </div>
  );
};

export default Header;
