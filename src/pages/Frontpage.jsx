import TabsMui from "../components/TabsMUI";
import "../index.css";

export default function FrontPage() {
  return (
    <div className="frontpage">
      <h1>ETUSIVU</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit nemo
        ducimus quas hic eum corporis quis facilis labore quasi explicabo
        reprehenderit fugiat animi amet aliquam, veniam et natus officia nam!
        Minus accusamus, corrupti repellendus necessitatibus eos sint
        consectetur et placeat doloribus perferendis eius dolor incidunt
        recusandae commodi quaerat culpa beatae vitae optio distinctio suscipit
        dolorum. Quis praesentium cupiditate quas eos! Accusamus, omnis quas et
        sunt dolor sapiente minima quis nam asperiores dolorum tenetur quam.
        Eos, architecto atque. Laboriosam, eligendi aut dolores perferendis, ut
        sit velit obcaecati quae suscipit non nobis! Repudiandae animi mollitia
        quia sint molestias sequi velit magni praesentium explicabo ex
        consequuntur, numquam, omnis id esse ipsa nostrum, minima totam?
        Perspiciatis eaque totam iure quidem est similique fuga unde? Nisi iure
        itaque quia voluptatem exercitationem quidem nesciunt amet, sequi
        similique soluta dolores sunt quo repudiandae quibusdam repellendus
        obcaecati cumque asperiores blanditiis neque quis facilis! Veniam
        facilis laudantium similique odio.
      </p>
      <div className="buttons">
        <button>LISÄÄ ASIAKAS</button>
        <button>LISÄÄ TUNTI</button>
      </div>
      <TabsMui></TabsMui>
    </div>
  );
}
