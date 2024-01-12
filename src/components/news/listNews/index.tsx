import axios from "axios";
import { useEffect, useState } from "react";
import ListNewsData from "../listNewsData";
import "./index.css";

const ListNews = (props: any) => {
  const [listNews, setListNews] = useState([]);

  console.log(props.listNews);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("/api/news/getAll");
        setListNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="listDivs">
      {props.listNews
        .sort(
          (a: any, b: any) =>
            new Date(a.datum).getTime() - new Date(b.datum).getTime()
        )
        .map((news: any) => (
          <ListNewsData
            key={news.id}
            id={news.id}
            naslov={news.title}
            datum={news.date}
            tekst={news.content}
            vazno={news.important}
            setListNews={setListNews}
          />
        ))}
    </div>
  );
};

export default ListNews;
