import TabsMui from "../components/TabsMUI";
import "../index.css";
import DownloadCsv from "../components/DownloadCsv";

export default function FrontPage() {
  return (
    <div className="frontpage">
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit nemo
        ducimus quas hic eum corporis quis facilis labore quasi explicabo
        reprehenderit fugiat animi amet aliquam, veniam et natus officia nam!
        Minus accusamus, corrupti repellendus necessitatibus eos sint
        consectetur et placeat doloribus perferendis eius dolor incidunt
        recusandae commodi quaerat culpa beatae vitae optio distinctio suscipit
        dolorum. Quis praesentium cupiditate quas eos! Accusamus, omnis quas et
        sunt dolor sapiente minima quis nam asperiores dolorum tenetur quam.
        facilis laudantium similique odio.
      </p>
      <DownloadCsv></DownloadCsv>
      <TabsMui></TabsMui>
    </div>
  );
}
