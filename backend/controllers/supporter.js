class Supporter {
  static async Support(req, res, next) {
    try {
      const userId = req.user.id;
      const user = await User.findByPk(userId);
      if (user) {
        user.supporter = true;
        await user.save();
        res
          .status(200)
          .json({ message: "Supporter status updated successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Supporter
