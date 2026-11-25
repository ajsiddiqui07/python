import { memo } from "react";

function FeeRow({ record, onMarkPaid }) {
  console.log("FeeRow rendered:", record.id);

  return (
    <tr>
      <td>{record.student}</td>
      <td>{record.course}</td>
      <td>₹{Number(record.amount).toLocaleString("en-IN")}</td>
      <td><span className={`status ${record.status.toLowerCase()}`}>{record.status}</span></td>
      <td>
        {record.status === "Pending" && (
          <button className="pay-button" onClick={() => onMarkPaid(record.id)}>Mark Paid</button>
        )}
      </td>
    </tr>
  );
}

export default memo(FeeRow);
