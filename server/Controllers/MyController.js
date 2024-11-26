const Calender = require("../Models/Calender");

const allAppointments = async (req, res) => {
  try {
    const appointments = await Calender.find({});

    if (appointments) {
      res.json(appointments);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const addAppointment = async (req, res) => {
  const { id, title, start, end } = req.body;

  const new_calender = new Calender({
    id: id,
    title: title,
    start: new Date(start),
    end: new Date(end),
  });
  await new_calender.save();
  res.send({ status: 200, message: " Appointment Booked !", success: true });
};

const deleteAppointment = async (req, res) => {
  const { id, title, start, end } = req.body;

  try {
    const appointment = await Calender.findOneAndDelete(id);

    res.send({ status: 200, message: " Appointment Deleted !", success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateAppointment = async (req, res) => {
  const { id, title, start, end } = req.body;

  try {
    const Appointment_Details = await Calender.findOne({ id: id });

    const filter = { _id: Appointment_Details._id };

    const options = { upsert: true };
    const updateDoc = {
      $set: {
        title: title,
        start: new Date(start),
        end: new Date(end),
      },
    };
    const result = await Calender.updateOne(filter, updateDoc, options);

    res.send({
      status: 200,
      message: " Appointment Updated !",
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log(err.message);
  }
};

module.exports = {
  addAppointment,
  deleteAppointment,
  updateAppointment,
  allAppointments,
};
