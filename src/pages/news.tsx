import axios from 'axios';
import { useEffect } from 'react';
import {useState} from 'react';
import AddNews from '../components/news/addNews';
import ListNews from '../components/news/listNews';

export default function News() {

  const [listNews, setListNews] = useState([]);

  const fetchNews = async () => {
    try {
      const response = await axios.get('/api/news/getAll');
      setListNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', width: '100%', flexDirection: 'column'}}>
      <AddNews setListNews={setListNews} />
      <ListNews setListNews={setListNews} listNews={listNews} />
    </div>
  );
}
