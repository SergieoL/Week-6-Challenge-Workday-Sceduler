var currentDay = moment().format("dddd, MMMM Do YYYY");;
$("#currentDay").text(currentDay);

var tasks = {
    "9": [],
    "10": [],
    "11": [],
    "12": [],
    "13": [],
    "14": [],
    "15": [],
    "16": [],
    "17": []
};



var setTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

var getTasks = function() {
    var savedTasks = localStorage.getItem("tasks");
    loadedTasks = JSON.parse(savedTasks);

    if (loadedTasks) {
        tasks = loadedTasks;

        $.each(tasks, function(hour, task) {
            var hourDiv = $("#" + hour);
            makeTask(task, hourDiv);
        })
    }
    audit();
}

var makeTask = function(taskText, hourDiv) {

    var taskDiv = hourDiv.find(".task");
    var taskP = $("<p>").addClass("description").text(taskText)
    taskDiv.html(taskP);
}

var replaceTextarea = function(textareaElement) {
    var taskInfo = textareaElement.closest(".task-info");
    var textArea = taskInfo.find("textarea");
    var time = taskInfo.attr("id");
    var text = textArea.val().trim();
    tasks[time] = [text];
    setTasks();
    makeTask(text, taskInfo);
}

$(".saveBtn").on("clcik", function() {
    replaceTextarea($(this));
})


var audit = function() {

    var currentHour = moment().hour();
    $(".task-info").each(function() {
        var elementHour = parseInt($(this).attr("id"));

        if (elementHour < currentHour) {
            $(this).removeClass(["present", "future"]).addClass("past");
        }
        else if (elementHour === currentHour) {
            $(this).removeClass(["past", "future"]).addClass("present");
        }
        else {
            $(this).removeClass(["past", "present"]).addClass("future");
        }
    })
}

$(".task").on("click", function() {
    $("textarea").each(function() {
        replaceTextarea($(this));
    })
    var time = $(this).closest(".task-info").attr("id");
    if (Number(time) >= moment().hour()) {
        var text = $(this).text();
        var textInput = $("<textarea>").addClass("form-control").val(text);
        $(this).html(textInput);
        textInput.trigger("focus");
    }
})

getTasks();