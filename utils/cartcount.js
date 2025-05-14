const ExportCartCount = async () => {
  let item = await CartMethod.GetAll();
  let countitem = item.length;

  return countitem;
};

export default ExportCartCount
