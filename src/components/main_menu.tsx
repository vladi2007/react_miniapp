import '../assets/main_menu.scss';

function Main() {
  return (
    <>
      <div className="main_menu_description">
        <div className="description">
          <div className="main_menu_description_logo">
            <img src="/main_menu/Clik.svg" />
          </div>
          <div className="main_menu_description_text">
            Функциональный сервис для проведения онлайн-квизов. Сейчас, Вы, находитесь в интерфейсе ведущего, где можете с легкостью начать управлять
            интерактивами.
          </div>
        </div>
        <div className="desc_head_1">Назначение и цели создания системы</div>
        <div className="desc_2_content">
          <div className="desc_2">
            <div className="desc_2_head">Проект Clik создан для решения ключевых задач:</div>
            <div className="desc_2_text">
              Оптимизация процесса проведения интерактивных мероприятий Упрощение взаимодействия между ведущими и аудиторией Автоматизация сбора и анализа
              данных участников Повышение вовлечённости за счёт игровых механик
            </div>
          </div>
          <div className="desc_head_2">
            <div> Почему Clik?</div>
          </div>
        </div>
        <div className="desc_3_content">
          <p>
            Интеграция с Telegram – не нужно скачивать дополнительные приложения. Работа в реальном времени – синхронизация между ведущим и участниками.
            Безопасность данных – соответствие требованиям законодательства РФ. Масштабируемость – поддержка больших аудиторий и новых форматов.
          </p>
        </div>
      </div>
    </>
  );
}

export default Main;
