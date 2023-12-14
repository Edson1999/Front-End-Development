import GlobalCard from '../../components/Card/Card';

function titleContent() {
  return (
    <div>
      <h1>Hola mundo</h1>
    </div>
  );
}

export const Home = () => {
  return <GlobalCard title={titleContent()} />;
};

export default Home;
