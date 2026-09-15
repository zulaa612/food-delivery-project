"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { server } from "@/app/_api/api";
import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { Pencil } from "lucide-react";

export default function AddNewDish() {
  const [addNewDish, setAddNewDish] = useState(false);
  const [newDishName, setNewDishName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddNewDish = async (e) => {
    e.preventDefault();
    if(!newDishName.trim()) return;
    try{
        const response = await server.post("/category-dishes/create")
    } 
  }
}
