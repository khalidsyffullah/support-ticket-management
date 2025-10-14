<?php

function translations($json) {
    if(!file_exists($json)) {
        return [];
    }
    return json_decode(file_get_contents($json), true);
}

if (! function_exists('language_path')) {
    /**
     * Get the path to the language folder.
     *
     * @param  string  $path
     * @return string
     */
    function language_path($path = '')
    {
        return base_path('lang'.($path ? DIRECTORY_SEPARATOR.$path : $path));
    }
}

if (!function_exists('static_asset')) {
    /**
     * Generate an asset path for the application.
     *
     * @param string $path
     * @param bool|null $secure
     * @return string
     */
    function static_asset($path, $secure = null) {
        return app('url')->asset('public/' . $path, $secure);
    }
}

function isActive($route, $className = 'active') {
    if (is_array($route)) {
        return in_array(Route::currentRouteName(), $route) ? $className : '';
    }
    if (Route::currentRouteName() == $route) {
        return $className;
    }
    if (strpos(URL::current(), $route)) {
        return $className;
    }
}

if (! function_exists('log_activity')) {
    function log_activity($activity, $description, $model = null)
    {
        $log = new \App\Models\ActivityLog();
        $log->user_id = auth()->id();
        $log->activity = $activity;
        $log->description = $description;

        if ($model) {
            $log->loggable()->associate($model);
        }

        $log->save();
    }
}
