const DownloadComponent: React.FC = () => {
  const handleDownloadClick = () => {
    window.open('https://www.planetapp.us/download', '_blank');
  }

  return (
    <div>
      <button onClick={handleDownloadClick}>Download Planet!</button>
    </div>
  );
};
  
export default DownloadComponent;
