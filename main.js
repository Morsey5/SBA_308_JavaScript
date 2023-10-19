const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };

  // The provided learner submission data.
const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];

  function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
    // Initialize an object to store learner data
    const learnerData = {};
  
    // Validate that the assignment group belongs to the course
    if (assignmentGroup.course_id !== courseInfo.id) {
      throw new Error('Assignment group does not belong to its course.');
    }
  
    // Iterate through learner submissions
    for (const submission of learnerSubmissions) {
      // Check if the learner is already in the learnerData object
      if (!learnerData[submission.learner_id]) {
        learnerData[submission.learner_id] = {
          id: submission.learner_id,
          avg: 0,
        };
      }
  
      // Get the learner data
      const learner = learnerData[submission.learner_id];
  
      // Find the assignment
      const assignment = assignmentGroup.assignments.find(a => a.id === submission.assignment_id);
  
      if (!assignment) {
        // Assignment not found
        console.error(`Assignment with ID ${submission.assignment_id} not found.`);
        continue;
      }
  
      // Check if the submission is late
      if (new Date(submission.submission.submitted_at) > new Date(assignment.due_at)) {
        // Handle late submission by reducing the score by 10%
        const latePenalty = submission.submission.score * 0.10;
        submission.submission.score -= latePenalty;
      }
  
      // Calculate the assignment score as a percentage
      const assignmentScore = (submission.submission.score / assignment.points_possible) * 100;
  
      // Update the average 
      learner.avg += (assignmentScore * (assignmentGroup.group_weight / 100));
  
      // Store the assignment score
      learner[submission.assignment_id] = assignmentScore;
    }
  
    // Convert the learnerData
    const result = Object.values(learnerData);
  
    return result;
  }
  
  // Example usage
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(result);