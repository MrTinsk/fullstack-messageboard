import Message from "../models/Message.js";

/**
 * Task 8
 * Control method to create new message
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const createMessage = async (req, res) => {
  try {
    const { user_id, content, category } = req.body;
    const newMessage = await Message.create({ user_id, content, category });

    // same as =>
    // const newMessage = await Message.create({
    //   user_id: req.body.user_id,
    //   content: req.body.content,
    //   category: req.body.category

    return res
      .status(200)
      .json({ message: "Message created successfully", newMessage });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error happened", error: error.message });
  }
};

/**
 * Task 9
 * Control method to find message by Id
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const findMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id).populate(
      "user_id",
      "username firstname lastname"
    );
    if (message.deleted === true)
      return res.status(404).json({ message: "Message was deleted" });
    return res.status(200).json(message);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error happened", error: error.message });
  }
};

/**
 * Task 10
 * Control method to edit message
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const editMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(400).json({ message: "Message not found" });
    }

    if (req.body.user_id !== message.user_id.toString()) {
      return res.status(400).json({ message: "User Id do not match" });
    }

    await Message.findByIdAndUpdate(
      req.params.id,
      {
        content: req.body.content,
        ["dates.last_edited"]: Date.now(),
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json("The message was updated🕺");
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error });
  }
};

/**
 * Task 11
 * Delete Method
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const deleteMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(400).json({ message: "Message not found" });
    }

    if (req.body.user_id !== message.user_id.toString()) {
      return res.status(400).json({ message: "User Id do not match" });
    }

    await Message.findByIdAndUpdate(
      req.params.id,
      {
        deleted: true,
        ["dates.last_edited"]: Date.now(),
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json("The message was Deleted 😲");
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error });
  }
};

/**
 * Task 12
 * Control method to view all messages by category
 * @param {*} req
 * @param {*} res
 */
export const viewAllMessagesByCategory = async (req, res) => {
  try {
    const messages = await Message.find({
      category: req.params.category,
      deleted: false,
    })
      .populate("user_id")
      .sort({ date: 1 })
      // .limit(3);
    if (!messages) {
      return res.status(400).json({ message: "Message not found" });
    }
    return res
      .status(200)
      .json({
        message: `These are Messages in the ${req.params.category} category`,
        messages: messages,
      });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error happened in category method", error: error });
  }
};

export default {
  createMessage,
  findMessageById,
  editMessageById,
  deleteMessageById,
  viewAllMessagesByCategory,
};
