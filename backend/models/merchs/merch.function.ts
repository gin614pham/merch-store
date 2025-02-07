import IMerch from "./merch.interface";
import Merch from "./merch.model";

const CreateMerch = async (merch: IMerch): Promise<IMerch | null> => {
  return await Merch.create(merch);
};

const DeleteMerch = async (id: string): Promise<IMerch | null> => {
  return await Merch.findByIdAndDelete(id);
};

const UpdateMerch = async (
  id: string,
  merch: IMerch
): Promise<IMerch | null> => {
  return await Merch.findByIdAndUpdate(id, merch, { new: true });
};

const GetMerch = async (_id: string): Promise<IMerch | null> => {
  return await Merch.findById(_id);
};

const GetAllMerch = async (): Promise<IMerch[] | null> => {
  return await Merch.find();
};

const GetMerchByName = async (name: string): Promise<IMerch[] | null> => {
  return await Merch.find({ name });
};

export {
  CreateMerch,
  DeleteMerch,
  UpdateMerch,
  GetAllMerch,
  GetMerchByName,
  GetMerch,
};
