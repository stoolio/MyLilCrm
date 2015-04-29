export default function(schema, options) {
  schema.add({
    createdAt: { type: Date, default: Date.now},
    modifiedAt: { type: Date, default: Date.now}
  });

  schema.pre('save', function(next) {
    this.lastMod = new Date;
    next();
  })

  if(options && options.index) {
    schema.path('createdAt').index(options.index);
    schema.path('lastMod').index(options.index);
  }
}
