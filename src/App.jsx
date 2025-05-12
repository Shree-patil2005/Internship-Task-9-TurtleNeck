import React, { useState } from "react"; // I made this file and rest of file invloving convex folder are created automatically by one command in terminal 
import {
  ConvexProvider,
  ConvexReactClient,
  useQuery,
  useMutation,
} from "convex/react";
import { api } from "../convex/_generated/api";

import "./index.css"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);


const initialFormStates = {
    personalInfo: { name: "", age: "", mobile: "", email: "", address: "" },
    taskInfo: { task: "", startDate: null, dueDate: null, description: "", status: "To Do" },
    categoryInfo: { role1: "", role2: "", department: "", team: "", project: "" },
    punishmentInfo: { fine: "500", reason: "", deductionType: "Fixed", deductionAmount: "", assignedBy: "" },
    opinionInfo: { reasonSelect: "", note: "", urgencyLevel: "Low", difficultyLevel: "Easy", feedback: "" },
};

const emptyCompletionFlags = {
    personalInfo: false,
    taskInfo: false,
    categoryInfo: false,
    punishmentInfo: false,
    opinionInfo: false,
};


function Header() {
  return (
    <header className="bg-blue-500 py-3 text-white text-center shadow-lg">
      <h1 className="text-[40px] font-semibold tracking-tight">
        WELCOME TO PIXCEL TASK MANAGER BY TENDER
      </h1>
      <p className="mt-2 text-[30px] ">Organize and Manage Your Tasks Efficiently</p>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-200 py-4 text-center text-gray-600 mt-12 border-t shadow-md">
      <p className="font-bold">&copy; {new Date().getFullYear()} PIXCEL Task Manager</p>
      <p className="text-[25px]">Built with Convex and Tailwind CSS </p>
    </footer>
  );
}


function TodoItem({ todo, onToggle }) {
    return (
        <li className="flex flex-col py-4 px-5 rounded-md shadow-md mb-3 border border-gray-200 bg-white hover:shadow-lg transition duration-200">
            <div className="flex justify-between items-center mb-2">
                <div
                    className={`flex-grow ${
                        todo.completed ? "line-through text-gray-500" : ""
                    }`}
                >
                    <div className="font-semibold text-lg text-gray-800">{todo.task}</div>
                </div>
                <button
                    onClick={() => onToggle(todo._id)}
                    className={`ml-4 w-10 h-10 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${
                        todo.completed
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                >
                    {todo.completed ? "✓" : <span className="text-lg">☐</span>}
                </button>
            </div>
            <div className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Name:</span> {todo.name}
            </div>
            <div className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Age:</span> {todo.age}
            </div>
            <div className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Mobile:</span> {todo.mobile}
            </div>
            {todo.email && (
                <div className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Email:</span> {todo.email}
                </div>
            )}
            {todo.address && (
                <div className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Address:</span> {todo.address}
                </div>
            )}
            {todo.priority && (
                <div className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Priority:</span> {todo.priority}
                </div>
            )}
            {todo.dueDate && (
                <div className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Due:</span> {new Date(todo.dueDate).toLocaleDateString()}
                </div>
            )}
            {todo.description && (
                <div className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Description:</span> {todo.description}
                </div>
            )}
            {todo.status && (
                <div className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Status:</span> {todo.status}
                </div>
            )}
            {todo.categoryRole1 && (
                <div className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Role 1:</span> {todo.categoryRole1}
                </div>
            )}
            {todo.categoryRole2 && (
                <div className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Role 2:</span> {todo.categoryRole2}
                </div>
            )}
            {todo.department && (
                <div className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Department:</span> {todo.department}
                </div>
            )}
            {todo.team && (
                <div className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Team:</span> {todo.team}
                </div>
            )}
            {todo.project && (
                <div className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Project:</span> {todo.project}
                </div>
            )}
            {todo.fine && (
                <div className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Fine:</span> {todo.fine}
                </div>
            )}
            {todo.reasonUncomplete && (
                <div className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Reason:</span> {todo.reasonUncomplete}
                </div>
            )}
            {todo.deductionType && (
                <div className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Deduction Type:</span> {todo.deductionType}
                </div>
            )}
            {todo.deductionAmount && (
                <div className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Deduction Amount:</span> {todo.deductionAmount}
                </div>
            )}
            {todo.assignedBy && (
                <div className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Assigned By:</span> {todo.assignedBy}
                </div>
            )}
            {todo.reasonSelect && (
                <div className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Reason Select:</span> {todo.reasonSelect}
                </div>
            )}
            {todo.note && (
                <div className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Note:</span> {todo.note}
                </div>
            )}
            {todo.urgencyLevel && (
                <div className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Urgency:</span> {todo.urgencyLevel}
                </div>
            )}
            {todo.difficultyLevel && (
                <div className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Difficulty:</span> {todo.difficultyLevel}
                </div>
            )}
            {todo.feedback && (
                <div className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Feedback:</span> {todo.feedback}
                </div>
            )}
        </li>
    );
}

function TodoList({ todos, onToggle }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Task List</h2>
      <ul>{todos.map((t) => <TodoItem key={t._id} todo={t} onToggle={onToggle} />)}</ul>
      {todos.length === 0 && <p className="text-gray-500 italic">No tasks added yet.</p>}
    </section>
  );
}


function InputField({ label, name, value, onChange, type = "text", pattern }) {
  return (
    <div className="mb-3">
      <label
        htmlFor={name}
        className="block text-gray-700 text-sm font-bold mb-2 capitalize"
      >
        {label}:
      </label>
      <input
        id={name}
        type={type}
        pattern={pattern}
        value={value}
        onChange={onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div className="mb-3">
      <label
        htmlFor={name}
        className="block text-gray-700 text-sm font-bold mb-2 capitalize"
      >
        {label}:
      </label>
      <select
        id={name}
        value={value}
        onChange={onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function DateInputField({ label, name, selected, onChange }) {
  return (
    <div className="mb-3">
      <label
        htmlFor={name}
        className="block text-gray-700 text-sm font-bold mb-2 capitalize"
      >
        {label}:
      </label>
      <DatePicker
        id={name}
        selected={selected}
        onChange={onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
}


 function PersonalInfoForm({ data, onChange }) {
   return (
     <section className="mb-6 p-5 rounded-md shadow-sm border border-green-200 bg-green-50">
       <h3 className="text-lg font-semibold mb-3 text-green-700">Personal Info</h3>
       <InputField label="Name" name="name" value={data.name} onChange={(e) => onChange("personalInfo", "name", e.target.value)} />
       <InputField label="Age" name="age" type="number" pattern="[0-9]*" value={data.age} onChange={(e) => onChange("personalInfo", "age", e.target.value)} />
       <InputField label="Mobile" name="mobile" type="text" value={data.mobile} onChange={(e) => {const numeric = e.target.value.replace(/\D/g, ""); onChange("personalInfo", "mobile", numeric);}}/>
       <InputField label="Email" name="email" type="email" value={data.email} onChange={(e) => onChange("personalInfo", "email", e.target.value)} />
       <InputField label="Address" name="address" type="text" value={data.address} onChange={(e) => onChange("personalInfo", "address", e.target.value)} />
     </section>
   );
 }

function TaskInfoForm({ data, onChange }) {
  return (
    <section className="mb-6 p-5 rounded-md shadow-sm border border-blue-200 bg-blue-50">
      <h3 className="text-lg font-semibold mb-3 text-blue-700">Task Info</h3>
      <InputField label="Task" name="task" value={data.task} onChange={(e) => onChange("taskInfo", "task", e.target.value)} />
      <DateInputField label="Start Date" name="startDate" selected={data.startDate} onChange={(date) => onChange("taskInfo", "startDate", date)} />
      <DateInputField label="Due Date" name="dueDate" selected={data.dueDate} onChange={(date) => onChange("taskInfo", "dueDate", date)} />
      <InputField label="Description" name="description" value={data.description} onChange={(e) => onChange("taskInfo", "description", e.target.value)} />
      <SelectField label="Status" name="status" value={data.status} onChange={(e) => onChange("taskInfo", "status", e.target.value)} options={["To Do", "In Progress", "Done"]} />  
    </section>
  );
}

function CategoryInfoForm({ data, onChange }) {
  return (
    <section className="mb-6 p-5 rounded-md shadow-sm border border-yellow-200 bg-yellow-50">
      <h3 className="text-lg font-semibold mb-3 text-yellow-700">Category</h3>
      <InputField label="Role 1" name="role1" value={data.role1} onChange={(e) => onChange("categoryInfo", "role1", e.target.value)} />
      <InputField label="Role 2" name="role2" value={data.role2} onChange={(e) => onChange("categoryInfo", "role2", e.target.value)} />
      <InputField label="Department" name="department" value={data.department} onChange={(e) => onChange("categoryInfo", "department", e.target.value)} />
      <InputField label="Team" name="team" value={data.team} onChange={(e) => onChange("categoryInfo", "team", e.target.value)} />
      <InputField label="Project" name="project" value={data.project} onChange={(e) => onChange("categoryInfo", "project", e.target.value)} />
    </section>
  );
}

function PunishmentInfoForm({ data, onChange }) {
  return (
    <section className="mb-6 p-5 rounded-md shadow-sm border border-red-200 bg-red-50">
      <h3 className="text-lg font-semibold mb-3 text-red-700">Punishment</h3>
      <SelectField label="Fine" name="fine" value={data.fine} onChange={(e) => onChange("punishmentInfo", "fine", e.target.value)} options={["500", "1000", "1500"]} />
      <InputField label="Reason for incompletion" name="reason" value={data.reason} onChange={(e) => onChange("punishmentInfo", "reason", e.target.value)} />
      <SelectField label="Deduction Type" name="deductionType" value={data.deductionType} onChange={(e) => onChange("punishmentInfo", "deductionType", e.target.value)} options={["Fixed", "Percentage"]} />
      <InputField label="Deduction Amount" name="deductionAmount" type="number" value={data.deductionAmount} onChange={(e) => onChange("punishmentInfo", "deductionAmount", e.target.value)} />
      <InputField label="Assigned By" name="assignedBy" value={data.assignedBy} onChange={(e) => onChange("punishmentInfo", "assignedBy", e.target.value)} />
    </section>
  );
}

function OpinionInfoForm({ data, onChange }) {
  return (
    <section className="mb-6 p-5 rounded-md shadow-sm border border-purple-200 bg-purple-50">
      <h3 className="text-lg font-semibold mb-3 text-purple-700">Opinion</h3>
      <InputField label="Why did you choose this task?" name="reasonSelect" value={data.reasonSelect} onChange={(e) => onChange("opinionInfo", "reasonSelect", e.target.value)} />
      <InputField label="Additional Notes" name="note" value={data.note} onChange={(e) => onChange("opinionInfo", "note", e.target.value)} />
      <SelectField label="Urgency Level" name="urgencyLevel" value={data.urgencyLevel} onChange={(e) => onChange("opinionInfo", "urgencyLevel", e.target.value)} options={["Low", "Medium", "High"]} />
      <SelectField label="Difficulty Level" name="difficultyLevel" value={data.difficultyLevel} onChange={(e) => onChange("opinionInfo", "difficultyLevel", e.target.value)} options={["Easy", "Medium", "Hard"]} />
      <InputField label="Feedback" name="feedback" value={data.feedback} onChange={(e) => onChange("opinionInfo", "feedback", e.target.value)} />
    </section>
  );
}


function TodoApp() {
  const todos = useQuery(api.todo.listTodos) ?? [];
  const addTodo = useMutation(api.todo.addTodo);
  const toggleTodo = useMutation(api.todo.toggleTodo);

  const [formStates, setFormStates] = useState(initialFormStates);
  const [formCompletion, setFormCompletion] = useState(emptyCompletionFlags);

 
  const handleFormChange = (section, field, value) => {
    let updatedValue = value;
    if (field === "age") {
      updatedValue = parseInt(value, 10);
      
    }

    const updatedSection = { ...formStates[section], [field]: updatedValue };

    setFormStates((prev) => ({
      ...prev,
      [section]: updatedSection,
    }));

    setFormCompletion((prev) => ({
      ...prev,
      [section]: Object.values(updatedSection).every(
        (v) => v !== null && v !== ""
      ),
    }));
  };

  const allFormsCompleted = Object.values(formCompletion).every(Boolean);

  const handleAddTodos = async () => {
    if (!allFormsCompleted) {
      alert("Please complete every form first.");
      return;
    }

    await addTodo({
        task: formStates.taskInfo.task,
        priority: formStates.personalInfo.age?.toString() ?? "",
        startDate: formStates.taskInfo.startDate?.getTime() ?? null,
        dueDate: formStates.taskInfo.dueDate?.getTime() ?? null,
        description: formStates.taskInfo.description,
        status: formStates.taskInfo.status,
        categoryRole1: formStates.categoryInfo.role1,
        categoryRole2: formStates.categoryInfo.role2,
        department: formStates.categoryInfo.department,
        team: formStates.categoryInfo.team,
        project: formStates.categoryInfo.project,
        fine: formStates.punishmentInfo.fine,
        reasonUncomplete: formStates.punishmentInfo.reason,
        deductionType: formStates.punishmentInfo.deductionType,
        deductionAmount: formStates.punishmentInfo.deductionAmount,
        assignedBy: formStates.punishmentInfo.assignedBy,
        reasonSelect: formStates.opinionInfo.reasonSelect,
        note: formStates.opinionInfo.note,
        urgencyLevel: formStates.opinionInfo.urgencyLevel,
        difficultyLevel: formStates.opinionInfo.difficultyLevel,
        feedback: formStates.opinionInfo.feedback,
        name: formStates.personalInfo.name,
        age: formStates.personalInfo.age,
        mobile: formStates.personalInfo.mobile,
        email: formStates.personalInfo.email,
        address: formStates.personalInfo.address,
    });

    
    setFormStates(initialFormStates);
    setFormCompletion(emptyCompletionFlags);
  };

  const handleToggle = async (id) => {
    await toggleTodo({ id });
  };

  
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <Header />

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-md shadow-xl mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PersonalInfoForm
            data={formStates.personalInfo}
            onChange={handleFormChange}
          />
          <TaskInfoForm
            data={formStates.taskInfo}
            onChange={handleFormChange}
          />
          <CategoryInfoForm
            data={formStates.categoryInfo}
            onChange={handleFormChange}
          />
          <PunishmentInfoForm
            data={formStates.punishmentInfo}
            onChange={handleFormChange}
          />
          <OpinionInfoForm
            data={formStates.opinionInfo}
            onChange={handleFormChange}
          />
        </div>

        <button
          onClick={handleAddTodos}
          disabled={!allFormsCompleted}
          className={`w-full mt-8 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-700 transition duration-200 ${
            allFormsCompleted ? "" : "opacity-50 cursor-not-allowed"
          }`}
        >
          Submit All Details
        </button>

        <TodoList todos={todos} onToggle={handleToggle} />
      </div>

      <Footer />
    </div>
  );
}


export default function App() {
  return (
    <ConvexProvider client={convex}>
      <TodoApp />
    </ConvexProvider>
  );
}