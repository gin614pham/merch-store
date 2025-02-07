import { Request, Response, Router } from "express";
import multer from "multer";
import Merch from "../models/merchs/merch.model";
import { CreateMerch } from "../models/merchs/merch.function";

const router = Router();
const upload = multer({ dest: "uploads/" });

async function uploadMerch(req: Request, res: Response) {
  try {
    const { name, description, price, quantity, image } = req.body;

    const merch = new Merch({
      name,
      description,
      price,
      quantity,
      image,
    });

    const createdMerch = await CreateMerch(merch);

    if (!createdMerch) {
      return res.status(500).json({ message: "Failed to create merch" });
    }

    return res
      .status(201)
      .json({ message: "Merch uploaded successfully", merch: createdMerch });
  } catch (error) {
    console.error("Error uploading merch:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getAllMerch(req: Request, res: Response) {
  try {
    const merchs = await Merch.find();
    return res.status(200).json(merchs);
  } catch (error) {
    console.error("Error getting all merch:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteMerch(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const merch = await Merch.findByIdAndDelete(id);
    if (!merch) {
      return res.status(404).json({ message: "Merch not found" });
    }
    return res.status(200).json({ message: "Merch deleted successfully" });
  } catch (error) {
    console.error("Error deleting merch:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function updateMerch(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, description, price, quantity, image } = req.body;
    const merch = await Merch.findByIdAndUpdate(id, {
      name,
      description,
      price,
      quantity,
      image,
    });
    if (!merch) {
      return res.status(404).json({ message: "Merch not found" });
    }
    return res.status(200).json({ message: "Merch updated successfully" });
  } catch (error) {
    console.error("Error updating merch:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getMerch(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const merch = await Merch.findById(id);
    if (!merch) {
      return res.status(404).json({ message: "Merch not found" });
    }
    return res.status(200).json(merch);
  } catch (error) {
    console.error("Error getting merch:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

router.post(
  "/store",
  upload.single("image"),
  async (req: Request, res: Response) => {
    await uploadMerch(req, res);
  }
);

router.get("/", async (req: Request, res: Response) => {
  await getAllMerch(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await deleteMerch(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
  await updateMerch(req, res);
});

router.get("/id/:id", async (req: Request, res: Response) => {
  await getMerch(req, res);
});

export default router;
