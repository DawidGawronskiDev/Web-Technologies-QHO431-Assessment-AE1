import Message from "../models/message.mjs";

export const getContact = (req, res) => {
  res.render("contact");
};

export const createMessage = async (req, res) => {
  const { name, message } = req.body;

  return await Message.createMessage(name, message)
    .then(() => {
      res.status(201).json({
        message: "Message sent successfully",
        data: { name, message },
      });
    })
    .catch((error) => {
      console.error("Error creating message: ", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
