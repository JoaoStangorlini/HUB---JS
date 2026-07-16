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
        // Capacitor Preferences are stored in SharedPreferences under the name "CapacitorStorage"
        val prefs = context.getSharedPreferences("CapacitorStorage", Context.MODE_PRIVATE)
        val tasksJson = prefs.getString("favorite_tasks", "[]")
        
        try {
            tasksArray = JSONArray(tasksJson)
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
            
            if (prazo.isNotEmpty()) {
                val inputFormat = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
                val outputFormat = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())
                try {
                    val date = inputFormat.parse(prazo)
                    val formatted = outputFormat.format(date!!)
                    views.setTextViewText(R.id.task_date, formatted)
                } catch (e: Exception) {
                    views.setTextViewText(R.id.task_date, prazo)
                }
            } else {
                views.setTextViewText(R.id.task_date, "")
            }

            // Fill-in Intent for list item click
            val fillInIntent = Intent()
            views.setOnClickFillInIntent(R.id.widget_item_container, fillInIntent)
            
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
