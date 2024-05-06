import TabsMui from "../components/TabsMUI";
import "../index.css";
import DownloadCsv from "../components/DownloadCsv";

export default function FrontPage() {
  return (
    <div className="frontpage">
      <DownloadCsv></DownloadCsv>
      <TabsMui></TabsMui>
    </div>
  );
}
