
import { useState } from "react";
import "./App.css";

const initialProjects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Improve the company website UI and user experience.",
    status: "In Progress",
  },
  {
    id: 2,
    name: "API Development",
    description: "Build and test the project REST APIs.",
    status: "Planning",
  },
];

function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Planning",
  });
  const [editingId, setEditingId] = useState(null);
  
const [searchTerm, setSearchTerm] = useState("");
const [statusFilter, setStatusFilter] = useState("All");


  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  
function handleSubmit(event) {
  event.preventDefault();

  if (!formData.name.trim()) {
    return;
  }

  if (editingId !== null) {
    setProjects((previousProjects) =>
      previousProjects.map((project) =>
        project.id === editingId
          ? {
              ...project,
              name: formData.name.trim(),
              description: formData.description.trim(),
              status: formData.status,
            }
          : project
      )
    );
  } else {
    const newProject = {
      id: crypto.randomUUID(),
      name: formData.name.trim(),
      description: formData.description.trim(),
      status: formData.status,
    };

    setProjects((previousProjects) => [
      newProject,
      ...previousProjects,
    ]);
  }

  setFormData({
    name: "",
    description: "",
    status: "Planning",
  });

  setEditingId(null);
  setShowForm(false);
}

  

function handleEdit(project) {
  setEditingId(project.id);

  setFormData({
    name: project.name,
    description: project.description,
    status: project.status,
  });

  setShowForm(true);
}



  
function handleDelete(projectId) {
  setProjects((previousProjects) =>
    previousProjects.filter(
      (project) => project.id !== projectId
    )
  );

  if (editingId === projectId) {
    setEditingId(null);
    setShowForm(false);
    setFormData({
      name: "",
      description: "",
      status: "Planning",
    });
  }
}

  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  ).length;
  
const filteredProjects = projects.filter((project) => {
  const matchesSearch = project.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === "All" ||
    project.status === statusFilter;

  return matchesSearch && matchesStatus;
});

  

  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="logo">TeamFlow<span>.</span></h2>

        <p className="nav-label">WORKSPACE</p>
        <div className="nav-item active">▦ Dashboard</div>
        <div className="nav-item">▤ My Projects</div>
        <div className="nav-item">✓ My Tasks</div>

        <div className="sidebar-footer">
          MERN Stack Project
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <span>Workspace / Dashboard</span>
          <div className="avatar">U</div>
        </header>

        <section className="page-content">
          <div className="page-heading">
            <div>
              <p className="eyebrow">OVERVIEW</p>
              <h1>Project Dashboard</h1>
              <p className="subtitle">
                Manage your projects and track progress.
              </p>
            </div>

            <button
              className="primary-btn"
              onClick={() => {
  if (showForm) {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: "",
      description: "",
      status: "Planning",
    });
  } else {
    setEditingId(null);
    setFormData({
      name: "",
      description: "",
      status: "Planning",
    });
    setShowForm(true);
  }
}}
            >
              {showForm ? "Cancel" : "+ New Project"}
            </button>
          </div>

          <section className="stats-grid">
            <div className="stat-card">
              <p>Total Projects</p>
              <h2>{projects.length}</h2>
              <span>All your projects</span>
            </div>

            <div className="stat-card">
              <p>In Progress</p>
              <h2>
                {projects.filter(
                  (p) => p.status === "In Progress"
                ).length}
              </h2>
              <span>Currently active</span>
            </div>

            <div className="stat-card">
              <p>Completed</p>
              <h2>{completedProjects}</h2>
              <span>Finished projects</span>
            </div>
          </section>

          {showForm && (
            <form className="project-form" onSubmit={handleSubmit}>
              <h2>{editingId !== null ? "Edit Project" : "Create a Project"}</h2>

              <label htmlFor="name">Project Name</label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Employee Management System"
                required
              />

              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="What is this project about?"
                rows={3}
              />

              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option>Planning</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>

              <button className="primary-btn" type="submit">
             {editingId !== null ? "Update Project" : "Create Project"}
             </button>
            </form>
          )}

          <section className="projects-section">
            <div className="section-heading">
              <div>
                <h2>Your Projects</h2>
                <p>View and manage your workspace projects.</p>
              </div>
              <span className="project-count">
                {projects.length} projects
              </span>
            </div>
            
<div className="project-filters">
  <input
    type="text"
    placeholder="Search projects..."
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
  />

  <select
    value={statusFilter}
    onChange={(event) => setStatusFilter(event.target.value)}
  >
    <option value="All">All Statuses</option>
    <option value="Planning">Planning</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
  </select>
</div>


            {filteredProjects.length === 0 ? (
              <div className="empty-state">
                <h3>No projects yet</h3>
                <p>Create your first project to get started.</p>
              </div>
            ) : (
              <div className="projects-grid">
                {filteredProjects.map((project) => (
                  <article className="project-card" key={project.id}>
                    
               <div className="project-card-top">
             <div className="project-icon">
    {project.name.charAt(0).toUpperCase()}
       </div>

      <div>
    <button
      className="edit-btn"
      onClick={() => handleEdit(project)}
    >
      Edit
     </button>

    <button
      className="delete-btn"
      onClick={() => handleDelete(project.id)}
      aria-label={`Delete ${project.name}`}
      title="Delete project"
    >
      ×
    </button>
  </div>
 </div>


                    <h3>{project.name}</h3>
                    <p className="project-description">
                      {project.description || "No description provided."}
                    </p>

                    <div className="project-card-footer">
                      <span
                        className={`status status-${project.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </section>
      </main>
    </div>
  );
}

export default App;
