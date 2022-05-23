import Message from "../models/Message.js";

export const createMessage = async (req, res) => {
  try {
    const { user_id, content, category } = req.body;

    const newMessage = await Message.create({ user_id, content, category });

    return res
      .status(200)
      .json({ message: "Message created successfully", newMessage });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error happened", error: error.message });
  }
};

export const findMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id).populate("user_id", "username firstname lastname")
    if (message.deleted)
      return res.status(404).json({ message: "Message was deleted" });
      return res.status(200).json(message);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error happened", error: error.message });
  }
};

export const editMessageById = async (req, res) => {
  try {
    await Message.findByIdAndUpdate(req.params.id, {
      user_id: req.body.user_id,
      message_id: req.body.message_id,
      content: req.body.content
    });
    return res.status(200).json({ message: "Message was updated" });
  } catch (error) {
    return res.status(404).json({ message: "Error updating message", error: error.message });
  }
}

export default { createMessage, findMessageById, editMessageById };
