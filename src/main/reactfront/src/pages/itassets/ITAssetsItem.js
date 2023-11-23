import { Link } from 'react-router-dom';
import React from "react";

const ITAssetsItem = ({
  currentPage,
  itemsPerPage,
  index,
  handleModal,
  assets_name,
  assets_detail_name,
  assets_status,
  username,
  add_date,
  rent_date,
  formatDate,
  item,
  
}) => {
  return (
    <tr key={index}>
        <th scope="row">
            {`${(currentPage - 1) * itemsPerPage + index + 1}`.padStart(4, '\u00A0')}
        </th>

      <td>
        <Link
          to="#"
          style={{ color: 'black' }}
          onClick={() => handleModal(item)}
          data-bs-toggle="modal"
          data-bs-target="#modalDialogScrollable"
        >
          {assets_name + ' ' +"("+ assets_detail_name+")"}
        </Link>
      </td>
      <td>{assets_status}</td>
      <td>{username}</td>
      <td>{formatDate(add_date)}</td>
      <td>{formatDate(rent_date)}</td>
      <td>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#basicModal"
          onClick={() => handleModal(item)}
          disabled={
            username
              ? true
              : false || assets_status === '폐기'
              ? true
              : false || assets_status === '승인대기중'
              ? true
              : false
          }
        >
          폐기/수리요청
        </button>
      </td>
    </tr>
  );
};

export default ITAssetsItem;
