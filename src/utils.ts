import * as fs from "fs";


fs.readFile("user.json", (error, data) => {
  // if the reading process failed,
  // throwing the error
  if (error) {
    // logging the error
    console.error(error);

    throw err;
  }

  // parsing the JSON object
  // to convert it to a JavaScript object
  const user = JSON.parse(data);

  // printing the JavaScript object
  // retrieved from the JSON file
  console.log(user);
});

