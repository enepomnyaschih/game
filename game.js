var score = 0;       // Текущий счет
var interval = 400;  // Интервал появления мишени в миллисекундах
var maxTargets = 10; // Максимальное количество мишеней на экране

// Объявляем главную точку входа в программу с помощью jQuery
$(function() {
  
  // Запускаем таймер появления мишеней
  var timer = setInterval(function() {
    
    // Проверяем, если неразбитых мишеней на экране уже слишком много...
    if ($('.target[status=alive]').length >= maxTargets) {
      
      // То удаляем панель с мишенями...
      $('.panel').remove();
      
      // Пишем Game over...
      $('.score-box').text('Game over. SCORE: ' + score);
      
      // Меняем стиль элемента .score-box на декоративный
      $('.score-box').addClass('finished');
      
      // Останавливаем таймер
      clearInterval(timer);
      return;
    }
    
    // Иначе создаем новую мишень
    var target = $('<div class="target" status="alive"><span class="target-1"></span><span class="target-2"></span><span class="target-3"></span><span class="target-4"></span></div>');
    
    // Добавляем ее в панель
    $('.panel').append(target);
    
    // Вычисляем размеры панели и мишени
    var panelWidth = $('.panel').width();
    var panelHeight = $('.panel').height();
    var targetWidth = target.width();
    var targetHeight = target.height();
    
    // Задаем случайные координаты для мишени
    target.css({
      left: (panelWidth - targetWidth) * Math.random() + 'px',
      top: (panelHeight - targetHeight) * Math.random() + 'px'
    });
  }, interval);
  
  // Прослушиваем клик мышью по всем неразбитым мишеням внутри панели
  $('.panel').on('mousedown', '.target[status=alive]', function(event) {
    
    // Получаем мишень, по которой кликнули
    var target = $(event.currentTarget);
    
    // Меняем статус мишени на broken1
    target.attr('status', 'broken1');
    
    // Запускаем таймер на 400 миллисекунд, чтобы удалить мишень
    setTimeout(function() {
      target.remove();
    }, 400);
    
    // Увеличиваем счет
    ++score;
    
    // Выводим счет на экран
    $('.score').text(score);
  });
});
