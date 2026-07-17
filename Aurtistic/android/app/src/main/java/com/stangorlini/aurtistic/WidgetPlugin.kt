package com.stangorlini.aurtistic

import android.appwidget.AppWidgetManager
import android.content.ComponentName
import android.content.Intent
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "WidgetPlugin")
class WidgetPlugin : Plugin() {

    @PluginMethod
    fun updateWidget(call: PluginCall) {
        val context = context
        val intent = Intent(context, FavoritesWidgetProvider::class.java)
        intent.action = AppWidgetManager.ACTION_APPWIDGET_UPDATE
        
        val widgetManager = AppWidgetManager.getInstance(context)
        val ids = widgetManager.getAppWidgetIds(ComponentName(context, FavoritesWidgetProvider::class.java))
        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids)
        
        context.sendBroadcast(intent)
        call.resolve()
    }
}
