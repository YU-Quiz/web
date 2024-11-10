
import ReportItem from "./ReportItem";

const ReportsList = ({ reports }) => {


  return (
    <div className="users-info-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>QuizTitle</th>
            <th>Nickname</th>

          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <ReportItem 
              key={report.reportId} 
              report={report} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsList;
