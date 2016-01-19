# Laravel-MessageBag-JS
Laravel's Illuminate\Support\MessageBag, except in Javascript


## Data Format
Example 1:
```
var mb = new MessageBag({
    errors:['Error message1!']
    warnings:['Error message1!']
});
```


Example 2:
```
var mb = new MessageBag({
    username:['Username is too short!','Username must be alphanumeric!']
    email:['Email is required']
});
```

## Usage:

```
mb.add(key, value);
// returns self with new message added // mutates

mb.merge(otherMessageBagObject);
// returns self with new message(s) merged // mutates

mb.has(key);
// returns true or false

mb.count();
// returns number of message // not number of keys!

mb.any();
// returns true or false

mb.has(key, format=':message');
// returns all messages for key in format

mb.sprinkle(parentSelector,formatFunction=fn(){},insertionFunction=fn(){});
// this will insert error messages into a form
// assumes that form correctly uses a mix .form-group, .form-control, and/or .input-group

mb.toUL(options);
// returns all messages as a <ul><li> html string
```
