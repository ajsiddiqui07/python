/*
FeeRow console.log counts:
Before marking one record Paid: 3 row logs for the initial 3 records.
After marking one record Paid: 1 row log for the changed record.
*/
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markFeePaid } from "../store/feesSlice.js";
import FeeRow from "./FeeRow.jsx";

export default function FeeTable({ uid }) {
  const dispatch = useDispatch();
  const { records, loading, saving, error } = useSelector((state) => state.fees);

  const pendingTotal = useMemo(
    () => records
      .filter((record) => record.status === "Pending")
      .reduce((total, record) => total + Number(record.amount), 0),
    [records],
  );

  const handleMarkPaid = useCallback(
    (id) => dispatch(markFeePaid({ uid, id })),
    [dispatch, uid],
  );

  return (
    <section className="fee-table-card">
      <div className="table-heading">
        <div>
          <p className="eyebrow">FEE COLLECTION</p>
          <h2>Fee records</h2>
        </div>
        <div className="pending-total">
          <span>Pending total</span>
          <strong>₹{pendingTotal.toLocaleString("en-IN")}</strong>
        </div>
      </div>

      {saving && <p className="saving">Saving fee record...</p>}
      {loading && <p className="table-state">Loading fees...</p>}
      {!loading && error && <p className="error" role="alert">{error}</p>}
      {!loading && !error && records.length === 0 && <p className="table-state">No fee records yet</p>}

      {!loading && !error && records.length > 0 && (
        <div className="table-scroll">
          <table>
            <thead>
              <tr><th>Student</th><th>Course</th><th>Amount</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <FeeRow key={record.id} record={record} onMarkPaid={handleMarkPaid} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
