function Enum(valid) {
  return { type: String, enum: valid };
}

function Range(valid) {
  return {
    from: { type: String, valid: valid },
    to: { type: String, valid: valid }
  }
}

export default {
  Enum,
  Range
}
