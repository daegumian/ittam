const DepartItem = ({ depart_id, depart_descript }) => {
  return (
    <>
      <option value={depart_id}>{depart_descript}</option>
    </>
  );
};

export default DepartItem;
