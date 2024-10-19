const Appointment = require('../models/AppointmentModel');
const moment = require('moment'); // For date manipulation
const appointmentMap = new Map(); // In-memory store for appointments

// Create a new appointment
const createAppointment = async (req, res) => {
    try {
        const appointmentData = req.body;
        const appointment = new Appointment(appointmentData);
        await appointment.save();

        // Store in memory for quick access (simulated DSA)
        appointmentMap.set(appointment._id.toString(), appointment);

        res.status(201).json({ message: 'Appointment created successfully', appointment });
    } catch (error) {
        res.status(400).json({ message: 'Error creating appointment', error });
    }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('petOwnerId veterinarianId petId');

        // Update the in-memory map (simulated DSA)
        appointments.forEach(appointment => {
            appointmentMap.set(appointment._id.toString(), appointment);
        });

        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({ message: 'Error retrieving appointments', error });
    }
};

// Get a specific appointment by ID
const getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;
        // Check in-memory map first
        if (appointmentMap.has(id)) {
            return res.status(200).json(appointmentMap.get(id));
        }

        const appointment = await Appointment.findById(id).populate('petOwnerId veterinarianId petId');
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Store in memory for quick future access
        appointmentMap.set(appointment._id.toString(), appointment);

        res.status(200).json(appointment);
    } catch (error) {
        res.status(400).json({ message: 'Error retrieving appointment', error });
    }
};

// Update an appointment
const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const appointment = await Appointment.findByIdAndUpdate(id, updatedData, { new: true });
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Update in-memory map
        appointmentMap.set(appointment._id.toString(), appointment);

        res.status(200).json({ message: 'Appointment updated successfully', appointment });
    } catch (error) {
        res.status(400).json({ message: 'Error updating appointment', error });
    }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findByIdAndDelete(id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Remove from in-memory map
        appointmentMap.delete(id);

        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting appointment', error });
    }
};



// Get upcoming appointments
const getUpcomingAppointments = async (req, res) => {
    try {
        // Get the current date and time
        const now = moment();

        // Fetch appointments where appointmentDate is greater than or equal to the current date
        const upcomingAppointments = await Appointment.find({
            $or: [
                { appointmentDate: { $gt: now.toDate() } },
                {
                    $and: [
                        { appointmentDate: now.toDate() },
                        { appointmentTime: { $gte: now.format('hh:mm A') } } // Assuming appointmentTime is in 'hh:mm A' format
                    ]
                }
            ]
        }).populate('petOwnerId veterinarianId petId serviceId');

        res.status(200).json(upcomingAppointments);
    } catch (error) {
        res.status(400).json({ message: 'Error retrieving upcoming appointments', error });
    }
};


module.exports = {
    createAppointment,
    getAllAppointments,
    getUpcomingAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
};
