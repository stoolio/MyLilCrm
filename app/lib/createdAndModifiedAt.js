let createdAndModifiedAt = function(schema, options) {
  schema.add({
    createdAt: { type: Date, default: Date.now},
    modifiedAt: { type: Date, default: Date.now}
  });

  schema.pre('save', function(next) {
    this.modifiedAt = new Date;
    next();
  });

  if(options && options.index) {
    schema.path('createdAt').index(options.index);
    schema.path('modifiedAt').index(options.index);
  }
};

let modifiedAt = function(schema, options) {
  schema.add({
    modifiedAt: { type: Date, default: Date.now }
  });

  schema.pre('save', function(next) {
    this.modifiedAt = new Date;
    next();
  });

  if(options && options.index) {
    schema.path('modifiedAt').index(options.index);
  }
};

export default createdAndModifiedAt;

export {modifiedAt};
