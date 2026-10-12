const User = require("../models/User");
const Event = require("../models/Event");
exports.listFavorites = async (req, res) => {
  try { const user = await User.findById(req.user._id).populate({ path: "favorites", match: { status: "approved" } }); return res.json({ favorites: user.favorites || [] }); }
  catch (e) { return res.status(500).json({ message: "Unable to load favorites." }); }
};
exports.addFavorite = async (req, res) => {
  try { const event = await Event.findOne({ _id: req.params.eventId, status: "approved" }); if (!event) return res.status(404).json({ message: "Event not found." }); await User.findByIdAndUpdate(req.user._id, { $addToSet: { favorites: event._id } }); return res.json({ message: "Event saved to favorites." }); }
  catch (e) { return res.status(400).json({ message: "Unable to save favorite." }); }
};
exports.removeFavorite = async (req, res) => {
  try { await User.findByIdAndUpdate(req.user._id, { $pull: { favorites: req.params.eventId } }); return res.json({ message: "Event removed from favorites." }); }
  catch (e) { return res.status(400).json({ message: "Unable to remove favorite." }); }
};
