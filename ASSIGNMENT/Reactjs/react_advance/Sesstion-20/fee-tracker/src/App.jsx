import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import AuthScreen from "./components/AuthScreen.jsx";
import FeeTable from "./components/FeeTable.jsx";
import { firebaseConfigured, firebaseConfigMissing, auth } from "./firebase.js";
import { addFee, loadFees } from "./store/feesSlice.js";

export default function App() {
  if (!firebaseConfigured) {
    return (
      <main className="config-page">
        <section>
          <h1>Configure Firebase</h1>
          <p>Copy <code>.env.example</code> to <code>.env.local</code> and add the Firebase values.</p>
          <p>Missing values: {firebaseConfigMissing.join(", ")}</p>
        </section>
      </main>
    );
  }

  return <FeeTrackerApp />;
}

function FeeTrackerApp() {
  const dispatch = useDispatch();
  const saving = useSelector((state) => state.fees.saving);
  const [user, setUser] = useState(undefined);
  const [student, setStudent] = useState("");
  const [course, setCourse] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  useEffect(() => {
    if (user) dispatch(loadFees(user.uid));
  }, [dispatch, user]);

  if (user === undefined) return <main className="loading-page">Loading account...</main>;
  if (!user) return <AuthScreen />;

  async function submitFee(event) {
    event.preventDefault();
    const cleanStudent = student.trim();
    const cleanCourse = course.trim();
    if (!cleanStudent || !cleanCourse || Number(amount) <= 0) return;

    await dispatch(addFee({
      uid: user.uid,
      fee: { student: cleanStudent, course: cleanCourse, amount: Number(amount), status: "Pending" },
    }));
    setStudent("");
    setCourse("");
    setAmount("");
  }

  return (
    <main className="app-shell">
      <header>
        <div><p className="eyebrow">PERSONAL FINANCE</p><h1>FeeTracker</h1></div>
        <div className="header-actions"><span>{user.email}</span><button onClick={() => signOut(auth)}>Sign out</button></div>
      </header>

      <section className="add-card">
        <h2>Add fee record</h2>
        <form onSubmit={submitFee}>
          <label>Student name<input value={student} onChange={(event) => setStudent(event.target.value)} required /></label>
          <label>Course<input value={course} onChange={(event) => setCourse(event.target.value)} required /></label>
          <label>Amount<input type="number" min="1" value={amount} onChange={(event) => setAmount(event.target.value)} required /></label>
          <button className="primary" type="submit" disabled={saving}>{saving ? "Saving..." : "Add"}</button>
        </form>
      </section>

      <FeeTable uid={user.uid} />
    </main>
  );
}
