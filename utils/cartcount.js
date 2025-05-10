const ExportCount = async () => {
  let item = await CartMethod.GetAll();
  let countitem = item.length;
  console.log("countitem", countitem);

  return countitem;
};

export default ExportCount
