import { Link } from 'react-router-dom';

const ITAssetsApprovalItem = ({
  index,
  currentPage,
  itemsPerPage,
  username,
  handleModal,
  item,
  appro_title,
  appro_kind,
  formatDate,
  appro_date,
  handleSubmit,
  handleNsubmit,
}) => {
  return (
    <tr key={index}>
      <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
      <td>{username}</td>
      <td>
        <Link
          to="#"
          style={{ color: 'black' }}
          data-bs-toggle="modal"
          data-bs-target="#modalDialogScrollable"
          onClick={() => handleModal(item)}
        >
          {appro_title}
        </Link>
      </td>
      <td>{appro_kind}</td>
      <td>{formatDate(appro_date)}</td>
      <td>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => handleSubmit(item)}
        >
          승인
        </button>
      </td>
      <td>
        <button className="btn btn-primary" onClick={() => handleNsubmit(item)}>
          반려
        </button>
      </td>
    </tr>
  );
};

export default ITAssetsApprovalItem;
