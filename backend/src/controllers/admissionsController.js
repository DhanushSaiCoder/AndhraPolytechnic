const AdmissionsContent = require('../models/admissionsContentModel');

// Get the single admissions content document
exports.getAdmissionsContent = async (req, res) => {
  try {
    let content = await AdmissionsContent.findOne();
    if (!content) {
      // If no content exists, create a default one
      content = new AdmissionsContent({
        processSteps: [
          { icon: 'FileText', title: 'Online Application', description: 'Submit your application through our online portal with all required documents.' },
          { icon: 'CheckSquare', title: 'Entrance Examination', description: 'Appear for the state-level entrance test as per the scheduled dates.' },
          { icon: 'Calendar', title: 'Counseling & Verification', description: 'Attend counseling and document verification sessions based on your rank.' },
          { icon: 'MapPin', title: 'Enrollment & Fee Payment', description: 'Complete the enrollment process by paying the prescribed fees.' },
        ],
        eligibilityCriteria: [
          'Passed 10th Standard/SSC Examination.',
          'Obtained at least 35% marks in the qualifying examination.',
          'Appeared for the state-level POLYCET entrance examination.',
          'Must be a citizen of India.',
        ],
        importantDates: [
          { title: 'Application Start', date: '2024-03-15' },
          { title: 'Application Deadline', date: '2024-04-30' },
          { title: 'Entrance Exam (POLYCET)', date: '2024-05-15' },
          { title: 'Counseling Starts', date: '2024-06-10' },
        ],
        contact: {
          email: 'admissions@andhrapolytechnic.ac.in',
          phone: '+91-9876543210',
          address: 'Andhra Polytechnic College, Kakinada',
        },
      });
      await content.save();
    }
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admissions content', error: error.message });
  }
};

// Update (or create) the single admissions content document
exports.updateAdmissionsContent = async (req, res) => {
  try {
    const content = await AdmissionsContent.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true, // Creates the document if it doesn't exist
      runValidators: true,
    });
    res.status(200).json(content);
  } catch (error) {
    res.status(400).json({ message: 'Error updating admissions content', error: error.message });
  }
};
