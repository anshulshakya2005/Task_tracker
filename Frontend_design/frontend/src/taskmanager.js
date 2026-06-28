import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus, FaSearch } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineDoneAll } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { createtask, deletetask, getalldata, updatetask } from "./api";
import Deletemodal from "./deletemodal";

function Taskmanager() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [input, setinput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, settasks] = useState([]);
  const [copytask, setcopytask] = useState([]);
  const [modal, setmodal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [edittask, setedittask] = useState(null);

  const bgStyle = {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #0f172a, #020617)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "650px",
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    color: "white",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.08)",
    border: "none",
    color: "white",
  };

  const taskItemStyle = {
    background: "rgba(255,255,255,0.05)",
    borderRadius: "12px",
    padding: "10px",
    margin: "8px 0",
  };

  const btnStyle = {
    background: "linear-gradient(135deg,#22c55e,#16a34a)",
    border: "none",
    color: "white",
  };

  const iconBtn = (color) => ({
    background: color,
    border: "none",
    color: "white",
    padding: "6px 10px",
    borderRadius: "8px",
    marginLeft: "5px",
    cursor: "pointer",
  });

  const handleDelete = async () => {
    setLoading(true);

    try {
      const id = selectedTask?._id;
      const { success } = await deletetask(id);

      if (success) {
        toast.success("Task deleted successfully");
        fetchalltask();
      } else {
        toast.error("Error deleting task");
      }
    } catch {
      toast.error("Internal server error");
    } finally {
      setLoading(false);
      setmodal(false);
      setSelectedTask(null);
    }
  };

  const handleupdate = async (item) => {
    const { _id, isDone, taskName } = item;

    setLoading(true);

    try {
      const { success } = await updatetask(_id, {
        taskName,
        isDone,
      });

      if (success) {
        toast.success("Task updated");
        fetchalltask();
      } else {
        toast.error("Update failed");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };
  const handlecheckanduncheck = async (item) => {
    const obj = {
      taskName: item.taskName,
      isDone: !item.isDone,
    };

    setLoading(true);

    try {
      await updatetask(item._id, obj);
      fetchalltask();
      toast.success(
        obj.isDone ? (
          <span className="d-flex align-items-center gap-2">
            <MdOutlineDoneAll />
            Completed
          </span>
        ) : (
          <span>Marked Pending</span>
        ),
      );
    } catch {
      toast.error("Error updating");
    } finally {
      setLoading(false);
    }
  };

  const handlecompletetask = () => {
    const taskName = input.trim();

    if (!taskName) {
      return toast.error("Task cannot be empty");
    }

    // Prevent duplicate task names
    const duplicate = tasks.some(
      (task) =>
        task.taskName.toLowerCase() === taskName.toLowerCase() &&
        task._id !== edittask?._id,
    );

    if (duplicate) {
      return toast.error("Task already exists");
    }

    if (edittask) {
      handleupdate({
        _id: edittask._id,
        taskName,
        isDone: edittask.isDone,
      });
      setedittask(null);
    } else {
      handletask();
    }

    setinput("");
  };
  const handletask = async () => {
    setLoading(true);

    try {
      const { success } = await createtask({
        taskName: input.trim(),
        isDone: false,
      });

      if (success) {
        toast.success("Task created");
        fetchalltask();
      } else {
        toast.error("Create failed");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  const fetchalltask = async () => {
    setLoading(true);

    try {
      const res = await getalldata();

      if (!res?.success) return;

      const sortedTasks = [...res.data].sort((a, b) => {
        return Number(a.isDone) - Number(b.isDone);
      });

      settasks(sortedTasks);
      setcopytask(sortedTasks);
    } catch {
      toast.error("Fetch error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchalltask();
  }, []);

  useEffect(() => {
    if (edittask) setinput(edittask.taskName);
  }, [edittask]);

  const handlesearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilter = (type) => {
    setFilter(type);
  };

  useEffect(() => {
    let filteredTasks = [...copytask];

    // Apply filter
    if (filter === "pending") {
      filteredTasks = filteredTasks.filter((task) => !task.isDone);
    } else if (filter === "completed") {
      filteredTasks = filteredTasks.filter((task) => task.isDone);
    }

    // Apply search
    if (search.trim()) {
      filteredTasks = filteredTasks.filter((task) =>
        task.taskName.toLowerCase().includes(search.toLowerCase()),
      );
    }

    settasks(filteredTasks);
  }, [search, filter, copytask]);
  return (
    <div style={bgStyle}>
      <div style={cardStyle} className="p-3 p-md-4">
        <h2 className="text-center mb-4 fw-bold">Task Tracker</h2>

        {/* Input */}
        <div className="input-group mb-3">
          {/* Editing Banner */}
          {edittask && (
            <div
              className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-3 p-3"
              style={{
                background: "rgba(59,130,246,0.15)",
                border: "1px solid rgba(59,130,246,0.4)",
                borderRadius: "12px",
                color: "#fff",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="mb-2 mb-sm-0">
                <FaEdit className="me-2 text-info" />
                Editing:
                <span className="fw-bold ms-1 text-info">
                  {edittask.taskName}
                </span>
              </div>

              <button
                className="btn btn-sm btn-outline-light"
                onClick={() => {
                  setedittask(null);
                  setinput("");
                }}
              >
                Cancel
              </button>
            </div>
          )}

          {/* Input */}
          <div className="input-group mb-3">
            <input
              style={inputStyle}
              value={input}
              onChange={(e) => setinput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) {
                  handlecompletetask();
                }
              }}
              disabled={loading}
              className="form-control"
              placeholder={edittask ? "Update your task..." : "Enter task..."}
            />

            <button
              style={btnStyle}
              className="btn d-flex align-items-center gap-2"
              onClick={handlecompletetask}
              disabled={loading}
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></span>
              ) : edittask ? (
                <>
                  <FaEdit />
                  Update
                </>
              ) : (
                <>
                  <FaPlus />
                  Add
                </>
              )}
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="input-group mb-3">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            className="form-control"
            placeholder="Search tasks..."
            onChange={handlesearch}
          />
        </div>
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-3">
          <button
            className={`btn flex-fill flex-sm-grow-0 ${
              filter === "all" ? "btn-primary" : "btn-outline-light"
            }`}
            style={{ minWidth: "110px" }}
            onClick={() => handleFilter("all")}
          >
            All
          </button>

          <button
            className={`btn flex-fill flex-sm-grow-0 ${
              filter === "pending" ? "btn-warning" : "btn-outline-light"
            }`}
            style={{ minWidth: "110px" }}
            onClick={() => handleFilter("pending")}
          >
            Pending
          </button>

          <button
            className={`btn flex-fill flex-sm-grow-0 ${
              filter === "completed" ? "btn-success" : "btn-outline-light"
            }`}
            style={{ minWidth: "110px" }}
            onClick={() => handleFilter("completed")}
          >
            Completed
          </button>
        </div>
        {/* Tasks */}
        <div>
          {tasks.length === 0 ? (
            <div className="text-center text-muted py-3">
              No matching tasks found
            </div>
          ) : (
            tasks.map((item) => (
              <div
                key={item._id}
                style={taskItemStyle}
                className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center"
              >
                <span
                  style={{
                    textDecoration: item.isDone ? "line-through" : "none",
                  }}
                >
                  {item.taskName}
                </span>

                <div className="mt-2 mt-sm-0">
                  <button
                    style={iconBtn("#22c55e")}
                    onClick={() => handlecheckanduncheck(item)}
                  >
                    <FaRegCheckSquare />
                  </button>

                  <button
                    style={iconBtn("#3b82f6")}
                    onClick={() => setedittask(item)}
                  >
                    <FaPencil />
                  </button>

                  <button
                    style={iconBtn("#ef4444")}
                    onClick={() => {
                      setmodal(true);
                      setSelectedTask(item);
                    }}
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Toast */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Modal */}
      {modal && (
        <Deletemodal
          show={modal}
          onClose={() => setmodal(false)}
          onConfirm={handleDelete}
          taskName={selectedTask?.taskName}
        />
      )}
    </div>
  );
}

export default Taskmanager;
