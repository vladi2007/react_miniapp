function NotAcess() {
  return (
    <div
      style={{
        display: 'flex', // включаем Flexbox
        justifyContent: 'center', // горизонтальное центрирование
        alignItems: 'center', // вертикальное центрирование
        height: '100vh', // высота на весь экран
        fontSize: '44px', // размер текста
        fontWeight: 'bold', // можно сделать жирным
      }}
    >
      Нет доступа
    </div>
  );
}

export default NotAcess;
