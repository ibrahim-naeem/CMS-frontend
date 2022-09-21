// http://localhost:5000/user/leave
router.post("/leave", authorization, async (req, res) => {
  try {
    const { LeaveDate, leaveStatus } = req.body;

    const gettingAllLeave = await pool.query("SELECT * FROM leave");
    // console.log(gettingAllLeave.rows);
    if (gettingAllLeave.rows.length !== 0) {
      let isUserExist = false;
      let isLeaveExist = false;
      let leaveIDandStatusArray = [];
      let existedLeaveID;

      gettingAllLeave.rows.map(async (leave) => {
        if (leave.date.trim().toLowerCase() == LeaveDate.trim().toLowerCase()) {
          existedLeaveID = leave.leave_id;

          isLeaveExist = true;

          leave.employees_id_status.map((leave_info) => {
            leaveIDandStatusArray.push(leave_info);
          });

          leave.employees_id_status.map((leave_info) => {
            if (leave_info[0] === req.user) {
              isUserExist = true;
            }
          });
        }
      });

      if (isLeaveExist) {
        if (isUserExist) {
          res.send("User already exist");
        } else {
          //query to add user to existing training
          const query = pool.query(
            "Update leave SET employees_id_status = $1 WHERE leave_id = $2",
            [
              [...leaveIDandStatusArray, [req.user, leaveStatus]],
              existedLeaveID,
            ]
          );
          res
            .status(200)
            .json({ message: "Leave Found but no user...USER Added" });
        }
      } else {
        //add training and add user
        const query = await pool.query(
          "INSERT INTO leave (date, employees_id_status) VALUES ($1, $2) RETURNING *",
          [LeaveDate, [req.user, leaveStatus]]
        );
        res.status(200).json({
          msg: "No Matching Leave found and new Leave Added to DB",
        });
      }
    }
    // else {
    //   res.send("No Traingings found");
    // }
  } catch (error) {
    console.error(error);
  }
});
