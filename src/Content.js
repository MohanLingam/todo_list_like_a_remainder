import { useEffect } from 'react';
import './Content.css'

const Content = ({ items, updateItem, handleDelete,quotes }) => {


  //     function showRandomQuote() {
  //     const randomIndex = Math.floor(Math.random() * quotes.length);
  //     const quote = quotes[randomIndex];
  //     const quotee = `${quote.quote}`;
  //     return quotee;
  //     // document.getElementById('author').textContent = `– ${quote.author}`;

  // }

  // Initial quote display


  // Update quote every 1 minute (60,000 ms)
  // setInterval(showRandomQuote, 3000);





  // const quotes = 'http://localhost:3500/items';



  // const getRandomQuote = () => {
  //     const randomIndex = Math.floor(Math.random() * quotes.length);
  //     return quotes[randomIndex];
  // };

  // const [currentQuote, setCurrentQuote] = useState(getRandomQuote());

  // useEffect(() => {
  //     const interval = setInterval(() => {
  //         setCurrentQuote(getRandomQuote());
  //     }, 60000); // 1 minute (60,000 ms)

  //     // Optional: also change the quote once immediately after mount
  //     setCurrentQuote(getRandomQuote());

  //     return () => clearInterval(interval); // Clean up interval on unmount
  // }, []);





  //     const [startTime, setStartTime] = useState('');
  //     const [endTime, setEndTime] = useState('');
  //     const [status, setStatus] = useState('Waiting to start...');
  //     const [timeLeft, setTimeLeft] = useState(null);
  //     const intervalRef = useRef(null);

  //     useEffect(() => {
  //         return () => clearInterval(intervalRef.current); // Clean up on unmount
  //     }, []);

  //     const startCountdown = () => {
  //         clearInterval(intervalRef.current);
  //         setStatus('Checking times...');

  //         if (!startTime || !endTime) {
  //             alert('Please select both start and end times.');
  //             return;
  //         }

  //         const now = new Date();
  //         const start = new Date(now.toDateString() + ' ' + startTime);
  //         const end = new Date(now.toDateString() + ' ' + endTime);

  //         if (end <= start) {
  //             // Support end time that goes into the next day
  //             end.setDate(end.getDate() + 1);
  //         }

  //         if (now < start) {
  //             setStatus('Waiting to reach start time...');
  //             intervalRef.current = setInterval(() => {
  //                 const current = new Date();
  //                 if (current >= start) {
  //                     clearInterval(intervalRef.current);
  //                     beginCountdown(end);
  //                 }
  //             }, 1000);
  //         } else {
  //             beginCountdown(end);
  //         }
  //     };

  //     const beginCountdown = (end) => {
  //         setStatus('Countdown started');
  //         intervalRef.current = setInterval(() => {
  //             const now = new Date();
  //             const timeDiff = end - now;

  //             if (timeDiff <= 0) {
  //                 clearInterval(intervalRef.current);
  //                 setStatus("Time's up!");
  //                 setTimeLeft(null);
  //                 return;
  //             }

  //             const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  //             const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  //             const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  //             setTimeLeft({
  //                 hours: hours.toString().padStart(2, '0'),
  //                 minutes: minutes.toString().padStart(2, '0'),
  //                 seconds: seconds.toString().padStart(2, '0')
  //             });
  //         }, 1000);
  //     };

  useEffect(() => {
    const interval = setInterval(() => {
      items.forEach(item => {
        if (item.status === 'Countdown started' && item.endTime) {
          const now = new Date();
          const end = new Date(new Date().toDateString() + ' ' + item.endTime);
          const diff = end - now;

          if (diff <= 0) {
            updateItem(item.id, { status: "Time's up!", timeLeft: null });
          } else {
            const hours = String(Math.floor(diff / 3600000)).padStart(2, '0');
            const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
            const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
            updateItem(item.id, { timeLeft: { hours, minutes, seconds } });
          }
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [items, updateItem]);

  const handleStart = (id) => {
    const item = items.find(i => i.id === id);
    if (!item.startTime || !item.endTime) {
      alert('Please fill both times');
      return;
    }
    const now = new Date();
    const start = new Date(new Date().toDateString() + ' ' + item.startTime);

    if (now < start) {
      updateItem(id, { status: 'Waiting for start...' });
      setTimeout(() => updateItem(id, { status: 'Countdown started' }), start - now);
    } else {
      updateItem(id, { status: 'Countdown started' });
    }
  };






  return (
    <main>
      <div className="content">
        <div className="content-head">
          <div className="content-left"><h1>Extensions List</h1></div>
          <div className="content-right">
            <button className='content-btn'>All</button>
            <button className='content-btn'>Active</button>
            <button className='content-btn'>Inactive</button>
          </div>
        </div>

        <div className="content-content">
          {items.map((item) => (

            <div className="cord" key={item.id}>
              <div className="cord-top">
                <h3>{item.item}</h3>
                <p id='quoteChange'>"Quotes" {item.quote.quote}</p>
                <div className="color">
                  <button className="color1"></button>
                  <button className="color2"></button>
                  <button className="color3"></button>
                </div>

                <div className="cord-bottom">
                  <form action="">
                    <label htmlFor="">To:  </label>
                    <input type="time" value={item.startTime} onChange={e => updateItem(item.id, { startTime: e.target.value })} />  <br />
                    <label htmlFor="End" className='end'>End: </label>
                    <input type="time" value={item.endTime} onChange={e => updateItem(item.id, { endTime: e.target.value })} className='end2' />
                    <h3>{item.status}</h3>

                    {item.timeLeft && <p>{item.timeLeft.hours}:{item.timeLeft.minutes}:{item.timeLeft.seconds}</p>}
                  </form>

                  <form action="" className='form2'>
                    <button className="cord-btn" onClick={() => handleDelete(item.id)}>Remove</button>
                    <input type="checkbox" onChange={() => handleStart(item.id)} />
                  </form>
                </div>
              </div>
            </div>

          ))}


        </div>

      </div>
    </main>
  )

}
export default Content