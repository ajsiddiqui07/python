import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase.js";

export const loadFees = createAsyncThunk("fees/loadFees", async (uid) => {
  const feesQuery = query(collection(db, "users", uid, "fees"), where("uid", "==", uid));
  const snapshot = await getDocs(feesQuery);
  return snapshot.docs.map((record) => ({ id: record.id, ...record.data() }));
});

export const addFee = createAsyncThunk("fees/addFee", async ({ uid, fee }) => {
  const ref = await addDoc(collection(db, "users", uid, "fees"), {
    ...fee,
    uid,
    createdAt: serverTimestamp(),
  });
  return { id: ref.id, ...fee, uid };
});

export const markFeePaid = createAsyncThunk("fees/markFeePaid", async ({ uid, id }) => {
  await updateDoc(doc(db, "users", uid, "fees", id), {
    status: "Paid",
    paidAt: serverTimestamp(),
  });
  return id;
});

const feesSlice = createSlice({
  name: "fees",
  initialState: {
    records: [],
    loading: false,
    saving: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFees.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loadFees.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(loadFees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Could not load fees.";
      })
      .addCase(addFee.pending, (state) => {
        state.saving = true;
        state.error = "";
      })
      .addCase(addFee.fulfilled, (state, action) => {
        state.saving = false;
        state.records.unshift(action.payload);
      })
      .addCase(addFee.rejected, (state, action) => {
        state.saving = false;
        state.error = action.error.message || "Could not add fee.";
      })
      .addCase(markFeePaid.fulfilled, (state, action) => {
        state.records = state.records.map((record) =>
          record.id === action.payload ? { ...record, status: "Paid" } : record,
        );
      })
      .addCase(markFeePaid.rejected, (state, action) => {
        state.error = action.error.message || "Could not update fee.";
      });
  },
});

export default feesSlice.reducer;
