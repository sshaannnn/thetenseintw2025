let preSeatNum = '';

document.querySelectorAll('svg [data-seat]').forEach((el) => {
  el.addEventListener('click', () => {
    const seatNum = el.dataset.seat;
    if (preSeatNum === seatNum) return;
    fetchData(seatNum);
    preSeatNum = seatNum;
  });
});

async function fetchData(seat) {
  try {
    const res = await axios.get('https://fakestoreapi.com/products');
    const products = res?.data;
    let str = '';
    console.log(products);
    products.forEach((x, i) => {
      str += ` <tr>
            <th>
              <a href="${x?.image}" class="hand" target="_blank">
                <img src="image.png">
              </a>
            </th>
                <td>B區 109 22排</td>
                <td>shan826</td>
              </tr>`;
    });
    console.log(333333);
    const list = document.querySelector('.list');
    list.innerHTML = str;
  } catch (error) {
    console.error('Uh-oh! Error fetching data:', error.message);
  }
}
