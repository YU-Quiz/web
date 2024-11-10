import "../../../styles/admin/UserItem.scss";

const ReportItem = ({
  report,
}) => {
  const { reportId, reason, type } = report;

  return (
    <tr className="post-item">
      <td>{reportId}</td>
      <td>{reason}</td>
      <td>{type}</td>
    </tr>
  );
};

export default ReportItem;