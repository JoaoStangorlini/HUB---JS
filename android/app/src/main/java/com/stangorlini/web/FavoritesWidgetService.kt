package com.stangorlini.web

import android.content.Context
import android.content.Intent
import android.widget.RemoteViews
import android.widget.RemoteViewsService
import org.json.JSONArray
import java.text.SimpleDateFormat
import java.util.Locale

class FavoritesWidgetService : RemoteViewsService() {
    override fun onGetViewFactory(intent: Intent): RemoteViewsFactory {
        return FavoritesWidgetFactory(this.applicationContext)
    }
}

class FavoritesWidgetFactory(private val context: Context) : RemoteViewsService.RemoteViewsFactory {
    private var tasksArray = JSONArray()

    override fun onCreate() {
        loadData()
    }

    override fun onDataSetChanged() {
        loadData()
    }

    private fun loadData() {
        val prefs = context.getSharedPreferences("CapacitorStorage", Context.MODE_PRIVATE)
        val tasksJson = prefs.getString("favorite_tasks", "[]")
        val selectedDim = prefs.getString("widget_filter_dimension", "") ?: ""
        
        try {
            val allTasks = JSONArray(tasksJson)
            if (selectedDim.isEmpty()) {
                tasksArray = allTasks
            } else {
                tasksArray = JSONArray()
                for (i in 0 until allTasks.length()) {
                    val task = allTasks.getJSONObject(i)
                    if (task.optString("dimensao", "") == selectedDim) {
                        tasksArray.put(task)
                    }
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
            tasksArray = JSONArray()
        }
    }

    override fun onDestroy() {}
    override fun getCount(): Int = tasksArray.length()

    override fun getViewAt(position: Int): RemoteViews {
        val views = RemoteViews(context.packageName, R.layout.widget_favorites_item)
        
        try {
            val task = tasksArray.getJSONObject(position)
            val name = task.optString("nome", "Sem título")
            val prazo = task.optString("prazo", "")
            
            views.setTextViewText(R.id.task_name, name)
            
            if (prazo.isNotEmpty() && prazo != "null") {
                try {
                    val sdf = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.getDefault())
                    sdf.timeZone = java.util.TimeZone.getTimeZone("UTC")
                    val date = sdf.parse(prazo)
                    if (date != null) {
                        val today = java.util.Calendar.getInstance()
                        today.set(java.util.Calendar.HOUR_OF_DAY, 0)
                        today.set(java.util.Calendar.MINUTE, 0)
                        today.set(java.util.Calendar.SECOND, 0)
                        today.set(java.util.Calendar.MILLISECOND, 0)
                        
                        val target = java.util.Calendar.getInstance()
                        target.time = date
                        target.set(java.util.Calendar.HOUR_OF_DAY, 0)
                        target.set(java.util.Calendar.MINUTE, 0)
                        target.set(java.util.Calendar.SECOND, 0)
                        target.set(java.util.Calendar.MILLISECOND, 0)
                        
                        val diffMillis = target.timeInMillis - today.timeInMillis
                        val diffDays = java.util.concurrent.TimeUnit.MILLISECONDS.toDays(diffMillis)
                        
                        val dateText = when {
                            diffDays == 0L -> "Hoje"
                            else -> "${diffDays}d"
                        }
                        
                        views.setTextViewText(R.id.task_date, dateText)
                        
                        val textColor = when {
                            diffDays < 0L -> "#FF4444"
                            diffDays == 0L || diffDays == 1L -> "#FFD700"
                            else -> "#E0E0E0"
                        }
                        views.setTextColor(R.id.task_date, android.graphics.Color.parseColor(textColor))
                    }
                } catch (e: Exception) {
                    views.setTextViewText(R.id.task_date, "")
                }
            } else {
                views.setTextViewText(R.id.task_date, "")
            }

            // Fill-in Intent for status click
            val fillInIntent = Intent().apply {
                putExtra("action", "change_status")
                putExtra("taskId", task.optString("id", ""))
            }
            views.setOnClickFillInIntent(R.id.task_status, fillInIntent)
            
            // To allow general item clicks if needed (optional)
            views.setOnClickFillInIntent(R.id.widget_item_container, Intent())
            
        } catch (e: Exception) {
            e.printStackTrace()
        }
        
        return views
    }

    override fun getLoadingView(): RemoteViews? = null
    override fun getViewTypeCount(): Int = 1
    override fun getItemId(position: Int): Long = position.toLong()
    override fun hasStableIds(): Boolean = true
}
