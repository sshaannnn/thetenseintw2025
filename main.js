document.querySelectorAll('svg [data-seat]').forEach((el) => {
  el.addEventListener('click', () => {
    fetchData(el.dataset.seat);
    const seatNum = el.dataset.seat;
    console.log(seatNum);
  });
});

async function fetchData(seat) {
  try {
    console.log('seat', seat);
    const res = await axios.get('https://fakestoreapi.com/products');
    const products = res?.data;
    let str = '';
    products.forEach((x, i) => {
      str += ` <tr>
                <th scope="row">${i + 1}</th>
                <td>${x?.category}</td>
                <td>${x?.price}</td>
              </tr>`;
    });

    const list = document.querySelector('.list');
    list.innerHTML = str;
  } catch (error) {
    console.error('Uh-oh! Error fetching data:', error.message);
  }
}
